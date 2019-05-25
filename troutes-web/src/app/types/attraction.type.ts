type TouristAttractionsType = {

    attractionId: string;
    name: string;
    description: string;
    images:{
        imgId:string;
        imgUrl:string;
    };
    location:string;
    videUrl: string;
    schedule: {
        schId: string;
        day: string;
        startTime: string;
        endTime: string;
    };
    editorId:string;
    active:string;
    creationDate:string;
    modifyDate: string;

} 