import * as objectPath from 'object-path'
import * as shortId from 'shortid'

class OfflineDatabase {
  path: String
  data: Object

  constructor () {
    this.data = {
      users: {
        id1: {
          name: 'Tom'
        }
      }
    }
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
    // Check if the current path already exists
    // If it doesn't we create it under a new Id
    if (!objectPath.has(this.data, this.path)) {
      let newId = shortId.generate()
      let expandedPath = `${this.path}.${newId}`

      objectPath.set(this.data, expandedPath, obj)
      return newId
    }

    // If the path already exists, we just update everything
    // underneath it with the new object.
    objectPath.set(this.data, this.path, obj)
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
