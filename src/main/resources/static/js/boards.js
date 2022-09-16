$("#btnUpdate").click(() => {
	update();
});

$("#btnDelete").click(() => {
	deleteOne();
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

function deleteOne () {
	let id = $("#id").val();

	$.ajax("/boards/" + id, {
		type: "DELETE",
		dataType: "json" // 응답할 때 데이터
	}).done((res) => {
		if (res.code == 1) {
			alert("글 삭제 완료");
			location.href = "/";
		} else {
			alert("글 삭제 실패하였습니다");
		}
	});
}