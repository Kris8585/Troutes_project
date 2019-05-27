type TouristAttractionsType = {
    id: string;
    attractionId: string;
    name: string;
    description: string;
    images: {
        imgId: number;
        imgUrl: string;
    };
    location: string;
    videUrl: string;
    schedule: {
        schId: number;
        day: string;
        startTime: string;
        endTime: string;
    };
    editorId: string;
    active: string;
    creationDate: string;
    modifyDate: string;

} 