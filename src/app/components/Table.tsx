import {dateToString} from "../../utils/formatDate.ts";

type TypeField = 'String' | 'Integer' | 'Boolean' | 'Date';

interface TableHeaders<Field> {
    text: string,
    field: keyof Field,
    width: string,
    type: TypeField,
}

interface TableProps<T> {
    tableHeaders: TableHeaders<T>[];
    rows: T[]
}


const Table = <T extends {}>({tableHeaders, rows}: TableProps<T>) => {
    return (
        <div className={'p-4 w-fit mx-auto'}>
            <div className={'bg-amber-200 mb-15'}>
                <table className={'sticky top-0'}>
                    <thead>
                    <tr>
                        {tableHeaders.map((tableHeader: TableHeaders<T>, index: number) => (
                            <td
                                key={index}
                                style={{
                                    maxWidth: tableHeader.width,
                                    minWidth: tableHeader.width,
                                }}
                                className={'bg-white border border-gray-300 p-1'}
                            >
                                {tableHeader.text}
                            </td>
                        ))}
                    </tr>
                    </thead>
                </table>
                <table className={'mt-[-1px]'}>
                    <tbody>
                    {[...Array(200).keys()].map((item) =>
                        <tr key={item}>
                            <td className={'bg-white border border-gray-300 p-1'}>{item}</td>
                            <td className={'bg-white border border-gray-300 p-1'}>{item}</td>
                            <td className={'bg-white border border-gray-300 p-1'}>{item}</td>
                            <td className={'bg-white border border-gray-300 p-1'}>{item}</td>
                        </tr>
                    )}
                    {rows.map((item: T, index: number) => (
                        <tr key={index}>
                            {tableHeaders.map((tableHeader: TableHeaders<T>, index: number) => {
                                if (tableHeader.type === 'Integer') {
                                    return (
                                        <td key={index}
                                            style={{maxWidth: tableHeader.width, minWidth: tableHeader.width}}
                                            className={'bg-white border border-gray-300 p-1'}
                                        >
                                            {String(item[tableHeader.field])}
                                        </td>
                                    )
                                } else if (tableHeader.type === 'String') {
                                    return (
                                        <td key={index}
                                            style={{maxWidth: tableHeader.width, minWidth: tableHeader.width}}
                                            className={'bg-white border border-gray-300 p-1'}
                                        >
                                            {String(item[tableHeader.field])}
                                        </td>
                                    )
                                } else if (tableHeader.type === 'Boolean') {
                                    return (
                                        <td key={index}
                                            style={{maxWidth: tableHeader.width, minWidth: tableHeader.width}}
                                            className={'bg-white border border-gray-300 p-1'}
                                        >
                                            {item[tableHeader.field] ? 'True' : 'False'}
                                        </td>
                                    )
                                } else if (tableHeader.type === 'Date') {
                                    return (
                                        <td key={index}
                                            style={{maxWidth: tableHeader.width, minWidth: tableHeader.width}}
                                            className={'bg-white border border-gray-300 p-1'}
                                        >
                                            {dateToString(new Date(item[tableHeader.field] as string))}
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td key={index}
                                            style={{maxWidth: tableHeader.width, minWidth: tableHeader.width}}
                                            className={'bg-white border border-gray-300 p-1'}
                                        >
                                            Error!
                                        </td>
                                    )
                                }
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Table;
