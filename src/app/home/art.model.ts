export class Art{
    public title: string;
    public creator: string;
    public description: string;
    public imagePath: string;

    constructor(title: string, creator: string, description: string, imagePath: string){
        this.title = title;
        this.creator = creator;
        this.description = description;
        this.imagePath = imagePath;
    }
}