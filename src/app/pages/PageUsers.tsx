import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../utils/store.ts";

const PageUsers: React.FC = () => {
    const deviceSize = useSelector((state: RootState) => state.device.size);
    const deviceIsMobile = useSelector((state: RootState) => state.device.isMobile);
    const loading = useSelector((state: RootState) => state.app.loading);
    const error = useSelector((state: RootState) => state.app.error);
    const message = useSelector((state: RootState) => state.app.message);
    const authorized = useSelector((state: RootState) => state.account.authorized);

    return (
        <div>
            <h1>deviceSize: {deviceSize}</h1>
            <h1>deviceIsMobile: {deviceIsMobile.toString()}</h1>
            <h1>loading: {loading.toString()}</h1>
            <h1>error: {error}</h1>
            <h1>message: {message}</h1>
            <h1>authorized: {authorized.toString()}</h1>
        </div>
    )
}

export default PageUsers;
