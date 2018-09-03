import * as objectPath from 'object-path'
import * as shortId from 'shortid'

class OfflineDatabase {
  path: String
  data: Object

  constructor () {
    this.path = ''
    this.data = {}
  }

  /**
   * This function updates the current path
   * before updating, we convert it's format. 
   */
  ref (path: String): OfflineDatabase {
    this.path = this._convertPathToObjectPath(path)
    return this
  }

  push (obj: Object): String {
    let newId = shortId.generate()
    let expandedPath = `${this.path}.${newId}`

    objectPath.set(this.data, expandedPath, obj)
    return newId
  }

  remove (): void {
    objectPath.del(this.data, this.path)
  }

  once(callback: (res: any) => any) {
    let currentData = this._getDataFromAtCurrentPath()
    if (null) throw new Error(`Invalid reference for store: ${this.path}`)

    return callback(currentData)
  }

  /**
   * This function uses the objectPath library
   * it uses this to enable us to acturatly fetch data
   * from the store.
   */
  _getDataFromAtCurrentPath (): Object {
    return objectPath.get(this.data, this.path)
  }

  /**
   * This function converts the following format:
   * /user/id/
   * to the following
   * user.id
   */
  _convertPathToObjectPath (path: String): String {
    return path.replace(/\//gi, '.')
  }
}

export default OfflineDatabase
