import { Carousel } from "./Components/Carousel";
import { EComServices } from "./Components/EComServices";
import { ExploreProducts } from "./Components/ExploreProducts";
import { Heros } from "./Components/Heros";

export const HomePage = () => {
    return (
        <>
            <ExploreProducts />
            <Carousel />
            <Heros />
            <EComServices />
        </>
    );
}