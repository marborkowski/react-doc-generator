import  {isDefaultValueTypeString,isInvalidDefaultValue } from '../generatereactdoc'
describe('isDefaultValueTypeString', () =>{
    it('Should return false if type of default value is not string', () => {
        const mockInput = {
            type: {name: 'number'},
            defaultValue: {
                value: 23
            }
        }
        const isString = isDefaultValueTypeString(mockInput)
        expect(isString).toEqual(false)
    })
    it('Should return false if type of default value is string but prop type is not string', () => {
        const mockInput = {
            type: {name: 'number'},
            defaultValue: {
                value: 'sdsd'
            }
        }
        const isString = isDefaultValueTypeString(mockInput)
        expect(isString).toEqual(false)
    })
    it('Should return null if prop was undefined', () => {
        const isString = isDefaultValueTypeString()
        expect(isString).toEqual(null)
    })
    it('Should return true if prop type was string and typeof default value was also string', () => {
        const mockInput = {
            type: {name: 'string'},
            defaultValue: {
                value: 'sdsd'
            }
        }
        const isString = isDefaultValueTypeString(mockInput)
        expect(isString).toEqual(true)
    })
})

describe('isInvalidDefaultValue', () => {
    it('Should return true for invalid  input', () => {
        const isInValid = isInvalidDefaultValue('3###')
        expect(isInValid).toEqual(true)
    })
    it('Should return false for valid  string input', () => {
        const isValid = isInvalidDefaultValue('3333')
        expect(isValid).toEqual(false)
    })
    it('Should return false for valid  number input', () => {
        const isValid = isInvalidDefaultValue(3333)
        expect(isValid).toEqual(false)
    })
})