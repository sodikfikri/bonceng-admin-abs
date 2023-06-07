@extends('layout.home')
@section('body_content')
    <!-- Navbar -->
<!-- Layout container -->
<!-- <div class="layout-page"> -->
<!-- @extends('layout.partial.sidebar') -->
@include('layout.partial.header')

          <!-- / Navbar -->

          <!-- Content wrapper -->
          <div class="content-wrapper">
            <!-- Content -->

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span>List Pengajuan Cuti Karyawan</h4>

              <!-- <div class="container"> -->
                <!-- <div class="row"> -->
                    <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> -->
                        <div class="card">
                            <div class="header">
                                <div class="row">

                                    <div class="col-6">
                                        <div class="navbar-nav m-3">
                                            <div class="nav-item d-flex align-items-center">
                                            <!-- <i class="bx bx-search fs-4 lh-0"></i> -->
                                            <input
                                                type="text"
                                                class="form-control border-1 shadow-none"
                                                name="daterange"
                                                placeholder="Daterange...."
                                            />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 mt-2">
                                    <label for="">Status</label>
                                        <div class="">
                                            <label class="form-check-label chkbox_wrapper">
                                                <input class="form-check-input filled-in prm_services i-prm-detail" name="filter-status" type="checkbox" id="status-need-approval" value="1">
                                                <span class="form-check-sign">
                                                    <span class="check"></span>
                                                    <label for="status-active" style="cursor:pointer;">Need approval</label>
                                                </span>
                                            </label>
                                            <label class="form-check-label chkbox_wrapper" style="padding-left: 10px">
                                                <input class="form-check-input filled-in prm_services i-prm-detail" name="filter-status" type="checkbox" id="status-approved" value="2">
                                                <span class="form-check-sign">
                                                    <span class="check"></span>
                                                    <label for="status-inactive" style="cursor:pointer;">Approved</label>
                                                </span>
                                            </label>
                                            <label class="form-check-label chkbox_wrapper" style="padding-left: 10px">
                                                <input class="form-check-input filled-in prm_services i-prm-detail" name="filter-status" type="checkbox" id="status-rejected" value="3">
                                                <span class="form-check-sign">
                                                    <span class="check"></span>
                                                    <label for="status-inactive" style="cursor:pointer;">Rejected</label>
                                                </span>
                                            </label>
                                        </div>
                                    </div>


                                    <div class="col-6 m-3">

                                            <button class="btn btn-primary" id="btnFilter">Search</button>
                                            <button class="btn btn-primary" id="btneExport">Export</button>
                                            <!-- <button class="btn btn-primary" id="exportData">Export</button> -->

                                        <!-- <div class="col-1"></div> -->



                                    </div>

                                </div>
                            </div>
                        </div>
                    <!-- </div> -->
                <!-- </div> -->
              <!-- </div> -->

              <!-- <hr class="my-5" /> -->

              <!-- Hoverable Table rows -->
              <div class="card mt-3 ">
                <h5 class="card-header">List</h5>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="list-abs">
                      <thead>
                        <tr>
                          <!-- <th>Date</th> -->
                          <th>User</th>
                          <th>FROM</th>
                          <th>TO</th>
                          <th>Alasan Cuti</th>
                          <th>status</th>
                          <th>reason</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>


              <div class="modal fade" id="modalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Confirm action</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <input type="hidden" id="idx" value="">
                      <input type="hidden" id="gdate" value="">
                      <div id="reason">
                        <label for="exampleFormControlTextarea1" class="form-label">Reason</label>
                        <textarea class="form-control" id="reason-val" rows="3"></textarea>
                      </div>
                      <label class="form-check-label chkbox_wrapper mt-3">
                            <input class="form-check-input filled-in prm_services i-prm-detail" name="" type="checkbox" id="confirm-action" value="1">
                            <span class="form-check-sign">
                                <span class="check"></span>
                                <label for="confirm-action" id="ck-label" style="cursor:pointer;">Checklist jika anda ingin melanjutkan!</label>
                            </span>
                      </label>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary save-action">Save</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal fade" id="modalExport" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Export Data</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                              <label for="exp-start-date" class="form-label">Start Date</label>
                              <input type="date" id="exp-start-date" class="form-control">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                              <label for="exp-end-date" class="form-label">End Date</label>
                              <input type="date" id="exp-end-date" class="form-control">
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" id="btn-export">Export</button>
                    </div>
                  </div>
                </div>
              </div>

              @include('layout.toast')


            </div>
          </div>
          <!-- @include('layout.partial.footer') -->
          <!-- Content wrapper -->

        <!-- </div> -->
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
        <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
        <script src="{{ asset('js/cuti/cuti_list.js') }}"></script>
@endsection
