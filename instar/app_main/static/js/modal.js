$(document).ready(function() {
    let $bOption = $('.btn-option');
    let $bUpload = $('.btn-upload');
    let $bReport = $('.btn-report');
    let $bReportContent = $('.btn-report-content');

    let $mOption = $('.option-modal');
    let $mUpload = $('.upload-modal');
    let $mReport = $('.report-modal');
    let $mReportContent = $('.report-content-modal');

    $bOption.click({modal: $mOption}, modalOpen);
    $bUpload.click({modal: $mUpload}, modalOpen);
    $bReport.click({modal: $mReport}, modalOpen);
    $bReportContent.click({modal: $mReportContent}, modalOpen);


    $('.modal-content .cancel').click(function() {
        $('.modal').css('display', 'none');
    });

})
function modalOpen(e) {
    $modal = e.data.modal;
    $modal.css('display', 'block');
    $modal.find('input[name="post_id"]').val($(this).val());
}
