import {AppDispatch, RootState} from "../../utils/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {setAppError} from "../../slices/appSlice.ts";
import {Close} from "@mui/icons-material";

const ErrorMessage = () => {
    const dispatch: AppDispatch = useDispatch();

    const error = useSelector((state: RootState) => state.app.error);

    if (error.length === 0) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="border border-gray-300 bg-white max-w-md w-full">
                <div className={'border-b h-8 border-gray-300 flex justify-between items-center'}>
                    <h2 className={'h-full flex items-center justify-center px-2'}>
                        Error
                    </h2>
                    <div
                        className={'h-full flex items-center justify-center w-8 cursor-pointer hover:bg-gray-300 transition-colors duration-200'}
                        onClick={() => dispatch(setAppError(''))}
                    >
                        <Close/>
                    </div>
                </div>
                <div className="space-y-4 p-4">{error}</div>
                <div className="border-t h-8 border-gray-300 flex justify-between items-center">
                    <button
                        className={'h-full w-full cursor-pointer hover:bg-gray-300 transition-colors duration-200'}
                        onClick={() => dispatch(setAppError(''))}
                        children={'Close'}
                    />
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
