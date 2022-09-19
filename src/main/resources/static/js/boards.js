$("#btnUpdate").click(() => {
	update();
});

$("#btnDelete").click(() => {
	deleteById();
});

function update() {
	let data = {
		title: $("#title").val(),
		content: $("#content").val()
	};
	let id = $("#id").val();

	$.ajax("/boards/" + id, {
		type: "PUT",
		dataType: "json",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("글 수정 완료");
			location.href = "/boards/" + id;
		} else {
			alert("업데이트 실패하였습니다");
		}
	});
}

function deleteById () {
	let id = $("#id").val();
	
	let page = $("#page").val();
	let keyword = $("#keyword").val();

	$.ajax("/boards/" + id, {
		type: "DELETE",
		dataType: "json" // 응답할 때 데이터
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/?page="+page+"&keyword="+keyword; // ?page=?&keyword=?
			//location.href = document.referer; 바로직전화면일 때만 가능
		} else {
			alert("글 삭제 실패");
		}
	});
}