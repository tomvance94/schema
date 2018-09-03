import OfflineDatabase from '../src/OfflineDatabase'
import * as shortId from 'shortid'
import { expect } from 'chai'
import * as sinon from 'sinon'

describe('Offline Database', () => {
  context('When pushing data to the store', () => {
    let database: OfflineDatabase
    let result: String

    before(() => {
      database = new OfflineDatabase()
      sinon.stub(shortId, 'generate').returns('mockedid')

      result = database.ref('users').push({name: 'Tom'})
    })

    after(() => {
      shortId.generate.restore()
    })

    it('returns with a generated id', () => {
      expect(result).to.equal('mockedid')
    })

    it('stores the object within the store', (done) => {
      database.ref('users').once((users) => {
        expect(users).to.deep.equal({
          mockedid: {
            name: 'Tom'
          }
        })
        done()
      })
    })
  })

  context('when removing data', () => {
    let database: OfflineDatabase

    before(() => {
      database = new OfflineDatabase()
      sinon.stub(shortId, 'generate').returns('mockedid')

      database.ref('users').push({name: 'Tom'})
      database.ref('users/mockedid').remove()
    })

    after(() => {
      shortId.generate.restore()
    })

    it('clears them from the store', (done) => {
      database.ref('users').once((users) => {
        expect(users).to.deep.equal({})
        done()
      })
    })
  })

  context('when calling once', () => {
    let database: OfflineDatabase
    let mockFunc

    before(() => {
      database = new OfflineDatabase()
      sinon.stub(shortId, 'generate').returns('mockedid')
      mockFunc = sinon.stub()

      database.ref('users').push({name: 'Tom'})
      database.ref('users').once(mockFunc)
    })

    after(() => {
      shortId.generate.restore()
    })

    it('calls the passed callback', () => {
      expect(mockFunc.calledWith({
        mockedid: {
          name: 'Tom'
        }
      })).to.be.true
    })
  })
})
