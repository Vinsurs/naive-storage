export interface NaiveStorageOptions {
  /**
   * Specify the storage you want to use
   * @default localStorage
   */
  storage?: Storage;
  /** @default false */
  debug?: boolean;
}
export type NaiveStorageInstance<D = any> = InstanceType<typeof NaiveStorage<D>>
const defaultOptions: NaiveStorageOptions = {
  storage: localStorage,
  debug: false
}
class NaiveStorage<D = any> {
  storage: Storage
  keys: Set<string>
  enableDebug: boolean
  constructor(options?: NaiveStorageOptions) {
    options = Object.assign({}, defaultOptions, options)
    this.storage = options.storage!
    this.enableDebug = !!options.debug
    this.keys = new Set<string>()
  }
  set(key: string, val: D) {
    const data = JSON.stringify(val)
    try {
      this.storage.setItem(key, data)
      this.keys.add(key)
      if (this.enableDebug) {
        console.log(`[NaiveStorage.set] Succeeded: key: ${key}, val: ${data}`)
      }
    } catch (error) {
      if (this.enableDebug) {
        console.log(`[NaiveStorage.set] Failed: key: ${key}, val: ${data}, error: `, error)
      }
    }
  }
  get(key: string, defVal?: D): D {
    try {
      const val = this.storage.getItem(key)
      if (val) {
        return JSON.parse(val)
      }
    } catch (error) {
      if (this.enableDebug) {
        console.log(`[NaiveStorage.get] Failed: key: ${key}, error: `, error)
      }
    }
    return defVal as D
  }
  del(key: string) {
    try {
      this.storage.removeItem(key)
      this.keys.delete(key)
      if (this.enableDebug) {
        console.log(`[NaiveStorage.del] Succeeded: key: ${key}`)
      }
    } catch (error) {
      if (this.enableDebug) {
        console.log(`[NaiveStorage.del] Error: key: ${key}, error: `, error)
      }
    }
  }
  clear() {
    this.keys.forEach(key => this.del(key))
  }
}

export function createNaiveStorage<D = any>(options?: NaiveStorageOptions) {
  return new NaiveStorage<D>(options)
}