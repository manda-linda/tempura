///<reference path="../../typings/index.d.ts"/>


export class snakeInterceptor {
    public static $inject = ['$q'];

    /* tslint:disable:variable-name */
    constructor(private $q: ng.IQService) {
    }
    /* tslint:enable:variable-name */

    public response = (response) => {
        if(response.data){
            response.data = this.snakeToCamelCase(response.data);        
        }
        return this.$q.resolve(response);
    };

    public responseTransformer = (data) => {
        if(!data){
            return data;
        }

        return this.snakeToCamelCase(data);
    }

    private snakeToCamelCase(data): any {
        let newData = {};

        for(var key in data){
            let newKey = key
            if(key.indexOf('_') > -1){
                newKey = key.replace(/[a-zA_Z\d](\_[a-zA_Z\d])/g, ($1) => {
                    return $1.replace(/(\_[a-zA_Z\d])/g, ($2) => {
                        return $2.toUpperCase();
                    }).replace('_','');
                }).replace('_','');    
            }
            newData[newKey] = angular.isObject(data[key]) ? this.snakeToCamelCase(data[key]) : data[key];
        }
        return newData;
    }

}
angular.module('tempura.services.snakeInterceptor', [])
    .service('snakeInterceptor', snakeInterceptor);


