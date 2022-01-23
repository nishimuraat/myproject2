import { LightningElement, track, wire } from 'lwc';
import serachRecord from '@salesforce/apex/ApexCallManager.serachCarRecord';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import {registerListener,unregisterAllListeners} from 'c/pubsub';

export default class Searchcomp extends LightningElement {

    @track searchCondition = {price: 0, keyword: null};

    changeKeywordHandler(event)
    {
        this.searchCondition.keyword = event.target.value;
    }

    changeMinPriceHandler(event)
    {
        this.searchCondition.price = event.target.value;
    }

    @wire(CurrentPageReference) pageRef;
    searchClickHandler()
    {
        serachRecord({keyWord: this.searchCondition.keyword, minPrice: this.searchCondition.price})
        .then (result => { 
            console.log("searchClickHandler");    
            console.log(result);
            fireEvent(this.pageRef,"dataTableEvent",result);
        })
    }
}