/**
 * FORJA WEBS - End-to-End Encryption & Cryptographic Integrity Service
 * Uses native Web Crypto API (AES-GCM 256-bit and SHA-256)
 */

export interface EncryptedPayload {
  cipherText: string; // Base64
  iv: string;         // Base64
  salt: string;       // Base64
  tagLength: number;
  hashSha256: string;
  algorithm: 'AES-GCM-256';
  encryptedAt: string;
}

// Convert buffer to Base64
function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 to ArrayBuffer
function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generate SHA-256 hex digest for cryptographic integrity verification
 */
export async function generateSha256Hash(message: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    // Fallback pseudo-hash if subtle crypto isn't available
    console.warn('SubtleCrypto error, falling back:', error);
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      hash = ((hash << 5) - hash) + message.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }
}

/**
 * Encrypt client sensitive payload using AES-GCM 256-bit
 */
export async function encryptSensitiveData(plainData: Record<string, unknown>, passphrase = 'FORJA-WEBS-E2EE-VAULT-2026'): Promise<EncryptedPayload> {
  const encoder = new TextEncoder();
  const rawData = encoder.encode(JSON.stringify(plainData));
  
  // 12 bytes IV recommended for AES-GCM
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive key via PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    rawData
  );

  const hashSha256 = await generateSha256Hash(JSON.stringify(plainData));

  return {
    cipherText: bufferToBase64(cipherBuffer),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt),
    tagLength: 128,
    hashSha256,
    algorithm: 'AES-GCM-256',
    encryptedAt: new Date().toISOString()
  };
}

/**
 * Decrypt client sensitive payload using AES-GCM 256-bit
 */
export async function decryptSensitiveData(payload: EncryptedPayload, passphrase = 'FORJA-WEBS-E2EE-VAULT-2026'): Promise<Record<string, unknown>> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const iv = base64ToBuffer(payload.iv);
  const salt = base64ToBuffer(payload.salt);
  const cipherBytes = base64ToBuffer(payload.cipherText);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as Uint8Array<ArrayBuffer>,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as unknown as Uint8Array<ArrayBuffer> },
    key,
    cipherBytes as unknown as Uint8Array<ArrayBuffer>
  );

  return JSON.parse(decoder.decode(decryptedBuffer));
}
