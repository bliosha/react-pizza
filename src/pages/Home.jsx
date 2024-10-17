import React, {useRef} from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import qs from "qs";

import {setCategoryID, setCurrentPage, setFilters} from '../redux/slices/filterSlice'


import Categories from "../components/categories";
import Sort, {list} from "../components/sort";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaBlock from "../components/PizzaBlock/pizzablock";
import Pagination from "../components/Pagination";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

const Home = () => {
    const navigate = useNavigate();
    const categoryID = useSelector(state => state.filter.categoryID);
    const searchValue = useSelector(state => state.filter.searchValue);
    const dispatch = useDispatch()
    const sortType = useSelector(state => state.filter.sort.sortProperty);
    const {items, status} = useSelector(selectPizzaData);
    const currentPage = useSelector(state => state.filter.currentPage);
    const isMounted = React.useRef(false);


    const isSearch = React.useRef(false);

    const onClickCategory = (id) => {
        dispatch(setCategoryID(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }
    const getPizzas = async () => {

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryID > 0 ? `category=${categoryID}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        dispatch(fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage,
            })
        )
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(obj => obj.sortProperty === params.sortProperty);
            dispatch(setFilters({
                ...params,
                sort,
            }));
            isSearch.current = true;
        }
    }, [])
    React.useEffect(() => {
            window.scrollTo(0, 0);
            if (!isSearch.current) {
                getPizzas();
            }
            isSearch.current = false;
        }, [categoryID, sortType, searchValue, currentPage]
    );
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryID,
                currentPage,
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryID, sortType, searchValue, currentPage])

    const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <>
            <div className="content__top">
                <Categories value={categoryID} onClickCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    );
};
export default Home;
