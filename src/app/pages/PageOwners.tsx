import React, {useCallback, useEffect, useReducer} from "react";
import {AppDispatch} from "../../utils/store.ts";
import {useDispatch} from "react-redux";
import {setAppError, setAppLoading} from "../../slices/appSlice.ts";
import {api} from "../../utils/api.ts";
import Table from "../components/Table.tsx";

interface Item {
    id: number;
    username: string;
    password?: string;
    created_at: string | null;
    updated_at: string | null;
}

interface State {
    items: Item[];
    dialog: 'create' | 'update' | 'delete' | null;
    currentItem: Item;
}

type Action =
    | { type: 'SET_ITEMS', payload: Item[] }
    | { type: 'OPEN_DIALOG', payload: { dialog: 'create' | 'update' | 'delete', item?: Item } }
    | { type: 'CLOSE_DIALOG' }
    | { type: 'UPDATE_CURRENT_ITEM', payload: Partial<Item> }
    | { type: 'ADD_ITEM', payload: Item }
    | { type: 'UPDATE_ITEM', payload: Item }
    | { type: 'DELETE_ITEM', payload: Item };

const defaultItem: Item = {
    id: 0,
    username: '',
    password: '',
    created_at: null,
    updated_at: null,
}

const initialState: State = {
    items: [],
    dialog: null,
    currentItem: defaultItem,
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload,
            }
        case 'OPEN_DIALOG':
            return {
                ...state,
                dialog: action.payload.dialog,
                currentItem: action.payload.item || defaultItem,
            }
        case 'CLOSE_DIALOG':
            return {
                ...state,
                dialog: null,
                currentItem: defaultItem,
            }
        case 'UPDATE_CURRENT_ITEM':
            return {
                ...state,
                currentItem: {...state.currentItem, ...action.payload},
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
                dialog: null,
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item => (item.id === action.payload.id ? action.payload : item)),
                dialog: null,
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                dialog: null,
            }
        default:
            return state;
    }
}

type TypeField = 'String' | 'Integer' | 'Boolean' | 'Date';

interface TableHeaders {
    text: string,
    field: keyof Item,
    width: string,
    type: TypeField,
}

const tableHeaders: TableHeaders[] = [
    {text: 'ID', field: 'id', width: '50px', type: 'Integer'},
    {text: 'Username', field: 'username', width: '200px', type: 'String'},
    {text: 'Created at', field: 'created_at', width: '150px', type: 'Date'},
    {text: 'Updated at', field: 'updated_at', width: '150px', type: 'Date'},
]

const PageOwners: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [state, localDispatch] = useReducer(reducer, initialState);

    const getItems = useCallback(async () => {
        dispatch(setAppLoading(true));
        try {
            const response = await api.get("/owner/");
            localDispatch({type: "SET_ITEMS", payload: response.data});
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch(setAppError(error.message));
            } else {
                dispatch(setAppError("An unknown error occurred"));
            }
        } finally {
            dispatch(setAppLoading(false));
        }
    }, []);

    useEffect(() => {
        getItems().then();
    }, [getItems]);

    // const openDialog = useCallback((dialog: "create" | "update" | "delete", item?: Item) => {
    //     localDispatch({type: "OPEN_DIALOG", payload: {dialog, item}});
    // }, []);

    // const closeDialog = useCallback(() => {
    //     localDispatch({type: "CLOSE_DIALOG"});
    // }, []);

    // const createItem = useCallback(async () => {
    //     dispatch(setAppLoading(true));
    //     try {
    //         const response = await api.post("/owner/", {
    //             username: state.currentItem.username,
    //             password: state.currentItem.password,
    //         });
    //         localDispatch({type: "ADD_ITEM", payload: response.data});
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             dispatch(setAppError(error.message));
    //         } else {
    //             dispatch(setAppError("An unknown error occurred"));
    //         }
    //     } finally {
    //         dispatch(setAppLoading(false));
    //     }
    // }, [state.currentItem, dispatch]);

    // const editItem = useCallback(async () => {
    //     dispatch(setAppLoading(true));
    //     try {
    //         const response = await api.put(`/owner/${state.currentItem.id}`, {
    //             username: state.currentItem.username,
    //             password: state.currentItem.password,
    //         });
    //         localDispatch({type: "UPDATE_ITEM", payload: response.data});
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             dispatch(setAppError(error.message));
    //         } else {
    //             dispatch(setAppError("An unknown error occurred"));
    //         }
    //     } finally {
    //         dispatch(setAppLoading(false));
    //     }
    // }, [state.currentItem, dispatch]);

    // const deleteItem = useCallback(async () => {
    //     dispatch(setAppLoading(true));
    //     try {
    //         await api.delete(`/owner/${state.currentItem.id}`);
    //         localDispatch({type: "DELETE_ITEM", payload: state.currentItem});
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             dispatch(setAppError(error.message));
    //         } else {
    //             dispatch(setAppError("An unknown error occurred"));
    //         }
    //     } finally {
    //         dispatch(setAppLoading(false));
    //     }
    // }, [state.currentItem, dispatch]);

    return (
        <>
            <Table
                tableHeaders={tableHeaders}
                rows={state.items}
            />
        </>
    )
}

export default PageOwners;
