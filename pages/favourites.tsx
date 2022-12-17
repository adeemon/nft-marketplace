import { MempozedMainContainer } from "../components/MainContainer";
import { MemoizedCard } from "../components/ProductCard";
import { selectAllFavourites } from "../slices/FavouritesSlice";
import { useAppSelector } from "../store/store";


export default function Favourite () {
    const favouritesSelected = useAppSelector(selectAllFavourites);

    const arrayToRender = favouritesSelected.map((favourite) => {
        return (
          <MemoizedCard {...favourite} isFavourite={true} key={favourite.id} />
          )
        }
      )

    return (
        <MempozedMainContainer keywords={"Favourites"}>
            {arrayToRender}
        </MempozedMainContainer>
    )
        
}