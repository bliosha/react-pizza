import React from 'react';
import debounce from 'lodash.debounce'
import styles from './search.module.scss'
import {useDispatch} from "react-redux";
import {setSearchValue} from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('')

    const inputRef = React.useRef<HTMLInputElement>(null);


    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 300),
        [],
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon} enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                    id="XMLID_223_"/>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput} className={styles.input}
                placeholder="Поиск пицки"/>
            {value && (
                <svg onClick={onClickClear}
                     className={styles.clearIcon}
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 7.58579L12 10.5858L15 7.58579L16.4142 9L13.4142 12L16.4142 15L15 16.4142L12 13.4142L9 16.4142L7.58579 15L10.5858 12L7.58579 9L9 7.58579Z"
                        fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                          fill="black"/>
                </svg>
            )}
        </div>

    )
}
export default Search;