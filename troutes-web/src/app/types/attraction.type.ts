type TouristAttractionsType = {
    id: string;
    attractionId: string;
    name: string;
    description: string;
    images: [{
        id: number;
        imageUrl: string;
    }
    ];


    location: {
        indications:string;
        latitude:number;
        longitude:number;
    }
    videUrl: string;
    schedule: [{
        schId: number;
        day: string;
        startTime: string;
        endTime: string;
    }];
    editorId: string;
    active: boolean;
    creationDate: string;
    modifyDate: string;

} 