import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Salepage } from "types/sale";
import { formatLocalDate } from "Utils/format";
import { BASE_URL } from "Utils/requests";

const DataTable = () => {
    const [activePage, setActivePage] = useState(0);
    const [page, setPage] = useState<Salepage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0


    })

    useEffect(() => {
        axios.get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
            .then(response => {
                setPage(response.data);
            });


    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }


    return (
        <>
            <Pagination page={page} onPageChance={changePage} />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Seller</th>
                            <th>Customers visited</th>
                            <th>Closed deals</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map(item => (
                            <tr key={item.id}>
                                <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                                <td>{item.seller.name}</td>
                                <td>{item.visited}</td>
                                <td>{item.deals}</td>
                                <td>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;