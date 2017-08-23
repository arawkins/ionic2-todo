export class Todo {

    public title:string;
    public uid:string;
    public completed:boolean;

    // stored as timestamps
    public created:number;
    public due:number;

    constructor(title:string, uid:string) {
        this.title = title;
        this.uid = uid;
        this.completed = false;
        this.created = Date.now();
        this.due = null;
    }
}
