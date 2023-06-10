import YearFilter from "../YearFilter"
import Filter from "../Filter"
import styles from "./index.module.scss"
import BrickSelector from "../BrickSelector"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import FilteringType from "../../enums/FilteringType"
import LoadingMethod from "../../enums/LoadingMethod"
import Genre from "../../enums/Genre"
import store from "../../store/store"
import ButtonType from "../../enums/ButtonType"
interface Props {
    isVisible: boolean
    onLoadMethodChange: (loadMethod: LoadingMethod) => void
}

const Filters: FC<Props> = ({ isVisible, onLoadMethodChange }) => {
    const texts = toJS(store.lang)
    const { genres } = texts.home.actions.fl_settings.fl_bgenre
    return (
        <div className={`${styles["filters-container"]} ${isVisible ? "" : styles.collapsed} container`}>
            <YearFilter />
            <Filter header="GENRES">
                <BrickSelector<Genre>
                    isInput={true}
                    name="genres"
                    buttonsInformation={[{
                        text: genres.horror,
                        id: Genre.Horror
                    }, {
                        text: genres.drama,
                        id: Genre.Drama
                    }, {
                        text: genres.comedy,
                        id: Genre.Comedy
                    }, {
                        text: genres.thriller,
                        id: Genre.Thriller
                    }, {
                        text: genres.crime,
                        id: Genre.Crime
                    }, {
                        text: genres.action,
                        id: Genre.Action
                    }, {
                        text: genres.fantasy,
                        id: Genre.Fantasy
                    }, {
                        text: genres.science,
                        id: Genre.Science
                    }, {
                        text: genres.cartoon,
                        id: Genre.Cartoon
                    }, {
                        text: genres.biography,
                        id: Genre.Biography
                    }, {
                        text: genres.sport,
                        id: Genre.Sport
                    }, {
                        text: genres.family,
                        id: Genre.Family
                    }, {
                        text: genres.serial,
                        id: Genre.Serial
                    }, {
                        text: genres.short_film,
                        id: Genre.ShortFilm
                    }, {
                        text: genres.arthouse,
                        id: Genre.Arthouse
                    }, {
                        text: genres.new_year,
                        id: Genre.NewYear
                    }, {
                        text: genres.adventures,
                        id: Genre.Adventures
                    }, {
                        text: genres.melodrama,
                        id: Genre.Melodrama
                    }, {
                        text: genres.western,
                        id: Genre.Western
                    }, {
                        text: genres.military,
                        id: Genre.Documentary
                    }, {
                        text: genres.historical,
                        id: Genre.Historical
                    }, {
                        text: genres.anime,
                        id: Genre.Anime
                    }, {
                        text: genres.musical,
                        id: Genre.Musical
                    }, {
                        text: genres.detective,
                        id: Genre.Detective
                    }, {
                        text: genres.fantastic,
                        id: Genre.Fantastic
                    }, {
                        text: genres.catastrophe,
                        id: Genre.Catastrophe
                    }, {
                        text: genres.music,
                        id: Genre.Music
                    }]}
                    selectSeveral={true}
                    canBeWithoutValue={true}
                    defaultValue={localStorage.getItem("genres")?.split(" ") as Genre[] ?? null}
                />
            </Filter>
            <Filter header="FILTERING TYPE">
                <BrickSelector<FilteringType>
                    isInput={true}
                    name="filtering-type"
                    buttonsInformation={[{
                        text: texts.home.actions.fl_settings.fl_type.types.solely,
                        id: FilteringType.Solely
                    }, {
                        text: texts.home.actions.fl_settings.fl_type.types.inclusive,
                        id: FilteringType.Inclusive
                    }, {
                        text: texts.home.actions.fl_settings.fl_type.types.without,
                        id: FilteringType.None
                    }]}
                    canBeWithoutValue={false}
                    selectSeveral={false}
                    defaultValue={[localStorage.getItem("filtering-type") as FilteringType ?? FilteringType.None]}
                />
            </Filter>
            <Filter header="LOAD METHOD">
                <BrickSelector<LoadingMethod>
                    onSelect={onLoadMethodChange}
                    isInput={false}
                    buttonsInformation={[{
                        text: texts.home.actions.fl_settings.pag_mtd.onclick,
                        id: LoadingMethod.OnClick
                    }, {
                        text: texts.home.actions.fl_settings.pag_mtd.auto,
                        id: LoadingMethod.Auto
                    }]}
                    canBeWithoutValue={false}
                    selectSeveral={false}
                    defaultValue={[localStorage.getItem("load-method") as LoadingMethod ?? LoadingMethod.OnClick]}
                    buttonType={ButtonType.Button}
                />
            </Filter>
        </div>
    )
}

export default observer(Filters)