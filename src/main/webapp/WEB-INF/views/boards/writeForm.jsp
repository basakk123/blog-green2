<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="../layout/header.jsp"%>

<div class="container">
	<form>
		<div class="mb-3 mt-3">
			<input id="title" type="text" class="form-control" placeholder="Enter title">
		</div>
		<div class="mb-3">
			<textarea id="content" class="form-control" rows="8"></textarea>
		</div>
		<button id="btnSave" type="button" class="btn btn-primary">글쓰기완료</button>
	</form>
</div>

<script>
	$("#btnSave").click(()=>{
		save();
	});
	
	function save(){
		let data = {
				title: $("#title").val(),
				content: $("#content").val(),
			};

			$.ajax("/boards", {
				type: "POST",
				dataType: "json", // 응답할 때 데이터
				data: JSON.stringify(data),
				headers: { // http header에 들고 갈 요청 데이터
					"Content-Type": "application/json" // 나 json으로 날릴거야
				}
			}).done((res) => {
				if (res.code == 1) {
					console.log(res);
					location.href = "/";
				}
			});
	}
</script>

<script>
	$('#content').summernote({
		height : 400
	});
</script>

<script src="/js/boards.js"></script>

<%@ include file="../layout/footer.jsp"%>

