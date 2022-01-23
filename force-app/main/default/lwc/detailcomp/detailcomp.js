import { LightningElement, wire } from 'lwc';

import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import {registerListener,unregisterAllListeners} from 'c/pubsub';

export default class Detailcomp extends LightningElement {

    data = null;
    data_have = false;

    @wire(CurrentPageReference) pageRef;
    connectedCallback()
    {
        registerListener("dataDetailEvent",this.handleDataDetailEvent,this);
    }

    disconnectedCallback()
    {
        unregisterAllListeners(this);
    }

    handleDataDetailEvent(dt)
    {
        console.log("handleDataDetailEvent");
        console.log(dt);
        this.data = dt;
        this.data_have = true;     
    } 
}