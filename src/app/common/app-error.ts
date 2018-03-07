export class AppError {
    json:any;
    status:number;
    message:string;
    constructor(public originalError?: any) {
        if (originalError) {
            this.status = originalError.status;
            if (originalError.json) {
                this.json = originalError.json();
                this.message = this.json.message;
            }
        }
    }
}
