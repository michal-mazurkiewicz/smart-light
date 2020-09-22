
class Filter{
    constructor(){
        this.lightBottomFilter = new LightBottomFilter();
        this.lightTopFilter = new LightTopFilter();
    }

    getNewBottomTopPowerValue(targetBottomValue, targetTopValue){
        return {bottom: this.lightBottomFilter.getNewBottomPowerValue(targetBottomValue), top: this.lightTopFilter.getNewTopPowerValue(targetTopValue)}
    }
}


class LightBottomFilter{
    constructor(){
        this.powerValues = []
    }

    getNewBottomPowerValue(newPowerValue){
        this.powerValues.push(newPowerValue)
        if(this.powerValues.length > 3){
            this.powerValues.splice(0, 1)
        }
        return newPowerValue;
    }
}

class LightTopFilter{
    constructor(){
        this.powerValues = []
    }

    getNewTopPowerValue(newPowerValue){
        this.powerValues.push(newPowerValue)
        if(this.powerValues.length < 3){
            return Math.round(this.powerValues.reduce((p,n) => p + n) / 3)
        } else if(this.powerValues.length >= 3){
            this.powerValues.splice(0, 1)
        }
        return newPowerValue
    }
}

module.exports = Filter