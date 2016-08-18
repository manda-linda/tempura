///<reference path="../../typings/index.d.ts"/>

export interface IParsedResult {
    itemName: string;
    source: string;
    viewMapper: string;
    modelMapper: string;
}

export class TypeaheadParser{
    public static $inject: Array<string> = ['$parse'];
    public static TYPEAHEAD_REGEXP: RegExp = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    constructor(private $parse) {
    }
    public parse(input: string): IParsedResult {
        let match = input.match(TypeaheadParser.TYPEAHEAD_REGEXP);
        if (!match) {
          throw new Error(
            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
            ' but got "' + input + '".');
        }

        return {
          itemName: match[3],
          source: this.$parse(match[4]),
          viewMapper: this.$parse(match[2] || match[1]),
          modelMapper: this.$parse(match[1])
        };
    }

}

angular.module('tempura.typeahead-parser', [])
/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .service('typeaheadParser', TypeaheadParser);