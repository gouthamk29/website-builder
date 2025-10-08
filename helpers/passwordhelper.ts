import crypto from "crypto"

export function hashPasswordBySalt(password,salt):Promise<string>{
    return new Promise((resolve,reject)=>{
        crypto.scrypt(password,salt,64,(error,hash)=>{
            if (error) reject(error);

            resolve(hash.toString("hex").normalize())
        })

    })
}

export function generateSalt(){
    return crypto.randomBytes(16).toString("hex").normalize();
}


export function verifyPasswordSync(password: string, storedHashHex: string, salt: string): boolean {
  const derived = crypto.scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHashHex, "hex");

  if (stored.length !== derived.length) {
    // Compare against zero buffer to keep timing consistent (safe false)
    const fake = Buffer.alloc(derived.length);
    return crypto.timingSafeEqual(derived, fake) && false;
  }

  return crypto.timingSafeEqual(stored, derived);
}