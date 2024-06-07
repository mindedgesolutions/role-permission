import React, { useEffect, useState } from "react";
import customFetch from "../../utils/customFetch";
import { splitErrors } from "../../utils/showError";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListBuyers } from "../../features/userSlice";
import {
  PageHeader,
  PageWrapper,
  PaginationContainer,
  TableLoader,
  UserActivate,
  UserAddEditModal,
  UserDeleteModal,
} from "../../components";
import { IoIosSearch } from "react-icons/io";
import { IoReloadSharp } from "react-icons/io5";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { setDeleteMode, setTotal } from "../../features/commonSlice";
import { nanoid } from "nanoid";
import { serialNo } from "../../utils/functions";

const BuyerListAdmin = () => {
  document.title = `List of Buyers | ${import.meta.env.VITE_ADMIN_TITLE}`;
  const returnUrl = `/admin/users/buyers`;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ s: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const { listBuyers, currentUser } = useSelector((store) => store.users);
  const { totalRecords, totalPages, currentPage, changeCount } = useSelector(
    (store) => store.common
  );
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/users/all/${3}`, {
        params: {
          page: queryParams.get("page") || "",
          search: queryParams.get("s") || "",
        },
      });

      const data = {
        totalRecords: response?.data?.meta?.totalRecords,
        totalPages: response?.data?.meta?.totalPages,
        currentPage: response?.data?.meta?.currentPage,
      };

      dispatch(setListBuyers(response?.data?.data?.rows));
      dispatch(setTotal(data));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryParams.get("page"), queryParams.get("s"), changeCount]);

  const resetSearch = () => {
    setForm({ ...form, s: "" });
    navigate(returnUrl);
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <PageHeader title={`List of all Buyers (Admin only)`} />
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <span className="d-none d-sm-inline">
                  <button
                    type="submit"
                    className="btn btn-success d-none d-sm-inline-block me-2"
                    // onClick={() => dispatch(showAddModal())}
                  >
                    Add new
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageWrapper>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              Total {totalRecords} buyers found
              <div className="col-auto ms-auto d-print-none">
                <Form method="GET">
                  <div className="btn-list">
                    <span className="d-none d-sm-inline">
                      <div className="input-icon">
                        <input
                          type="text"
                          name="s"
                          className="form-control"
                          placeholder="Search by name / email / phone ..."
                          title="Search by name / email / phone ..."
                          value={queryParams.get("s") || form.s}
                          onChange={handleChange}
                        />
                      </div>
                    </span>
                    <span className="d-none d-sm-inline">
                      <button
                        type="submit"
                        className="btn btn-primary d-none d-sm-inline-block me-2"
                      >
                        <IoIosSearch className="fs-3" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-default d-none d-sm-inline-block"
                        onClick={resetSearch}
                      >
                        <IoReloadSharp className="fs-3" />
                      </button>
                    </span>
                  </div>
                </Form>
              </div>
            </div>

            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-vcenter datatable table-hover table-bordered card-table fs-5">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white">SL. NO.</th>
                      <th className="bg-dark text-white">Name</th>
                      <th className="bg-dark text-white">Email</th>
                      <th className="bg-dark text-white">Mobile</th>
                      <th className="bg-dark text-white">Status</th>
                      <th className="bg-dark text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={7}>
                          <TableLoader />
                        </td>
                      </tr>
                    ) : listBuyers.length > 0 ? (
                      <>
                        {listBuyers.map((i, index) => {
                          const isActive = i?.is_active ? (
                            <span className="badge bg-success-lt p-1">
                              Active
                            </span>
                          ) : (
                            <span className="badge bg-danger-lt p-1">
                              Inactive
                            </span>
                          );

                          return (
                            <tr key={nanoid()}>
                              <td>
                                {serialNo(queryParams.get("page")) + index}.
                              </td>
                              <td>{i?.name?.toUpperCase()}</td>
                              <td>{i?.email}</td>
                              <td>{i?.mobile}</td>
                              <td>{isActive}</td>
                              <td className="text-nowrap">
                                {i.id !== currentUser.id ? (
                                  i?.is_active ? (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-yellow btn-sm me-2"
                                      >
                                        <MdModeEdit size={14} />
                                      </button>

                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                      >
                                        <AiOutlineMinusCircle
                                          size={14}
                                          onClick={() =>
                                            dispatch(setDeleteMode(i.id))
                                          }
                                        />
                                      </button>
                                    </>
                                  ) : (
                                    <UserActivate id={i?.id} />
                                  )
                                ) : (
                                  <span className="fs-3">🍺🍺🍺</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <tr>
                          <td colSpan={8} className="text-center">
                            NO DATA FOUND
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <UserAddEditModal />
        <UserDeleteModal />

        <PaginationContainer pageCount={totalPages} currentPage={currentPage} />
      </PageWrapper>
    </>
  );
};

export default BuyerListAdmin;
