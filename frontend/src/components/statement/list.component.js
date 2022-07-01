import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function List() {
  const [statements, setStatements] = useState([]);
  //var [balance, setBalance] = useState(0);
  var balance = 0;
  var creditAmount = 0;
  var debitAmount = 0;

  useEffect(() => {
    fetchStatements();
  }, []);

  const fetchStatements = async () => {
    await axios.get(`http://localhost:8000/api/statements`).then(({ data }) => {
      setStatements(data);
    });
  };

  const deleteStatement = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/statements/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchStatements();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link
            className="btn btn-primary mb-2 float-end"
            to={"/statement/create"}
          >
            Create Statement
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Statement</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {statements.length > 0 &&
                    statements.map((row, key) => {
                      return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{row.particulars}</td>
                          <td>{row.type === "Debit" ? row.amount : ""}</td>
                          <td>{row.type === "Credit" ? row.amount : ""}</td>
                          <td>{row.type === "Credit"? (creditAmount += row.amount, balance += row.amount) : (debitAmount += row.amount, balance -= row.amount)}</td>
                          <td>
                            <Link to={`/statement/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                            <Button
                              variant="danger"
                              onClick={() => deleteStatement(row.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>Balance Carry Forward</td>
                    <td>{debitAmount}</td>
                    <td>{creditAmount}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
