export class RateRequest {
    rate: number;
    postId: number;
    constructor(rate: number, postId: number) {
        this.rate = rate;
        this.postId = postId;
    }
}