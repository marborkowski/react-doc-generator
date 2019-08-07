import { processProp } from '../generatereactdoc'

describe('ProcessProp', () => {
    it('Process prop should not modify the default value if the type is a string', () => {
        const mockProp = {
            type: {
                name:'string'
            },
            defaultValue: {
                value:'somestring'
            }
        }
        const output = processProp(mockProp)
        expect(output).toMatchSnapshot()
    })
    it('Process prop should not modify the default value if the type is not string but default value doesnt have special characters', () => {
        const mockProp = {
            type: {
                name: 'number',
            },
            defaultValue: {
                value:22
            }
        }
        const output = processProp(mockProp)
        expect(output).toMatchSnapshot()
    })
    it('Process prop should overwrite the default value when type is not string and there are invalid characters', () => {
        const mockProp = {
            type: {
                name: 'number',
            },
            defaultValue: {
                value:'@#454'
            }
        }
        const output = processProp(mockProp)
        expect(output).toMatchSnapshot()
    })
})