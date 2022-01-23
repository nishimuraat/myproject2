import { LightningElement, wire } from 'lwc';

import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import {registerListener,unregisterAllListeners} from 'c/pubsub';

export default class Listcomp extends LightningElement {

    data = [{Id:"11111", Name:"test", maker__c:"ホンダ", Price__c:100}];

    @wire(CurrentPageReference) pageRef;
    connectedCallback()
    {
        registerListener("dataTableEvent",this.handleDataTableEvent,this);
    }

    disconnectedCallback()
    {
        unregisterAllListeners(this);
    }

    handleDataTableEvent(dt)
    {
        console.log("handleDataTableEvent");
        console.log(dt);
        this.data = dt;       
    }

    itemHandler(event)
    {
        console.log("itemHandler");
        console.log(event.target.dataset.id);

        for (const dt in this.data) {
            if(this.data[dt].Id == event.target.dataset.id)
            {
                fireEvent(this.pageRef,"dataDetailEvent",this.data[dt]);
                break;
            }
        }
    }
}