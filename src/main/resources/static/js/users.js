let isUsernameSameCheck = false;

$("#btnJoin").click(() => {
	join();
});

$("#btnUsernameSameCheck").click(() => {
	checkUsername();
});

$("#btnLogin").click(() => {
	login();
});

$("#btnDelete").click(() => {
	resign();
});

$("#btnUpdate").click(() => {
	update();
});

function join() {
	if (isUsernameSameCheck == false) {
		alert("유저네임 중복체크를 진행해주세요");
		return; // 메서드 종료
	}
	// 0. 통신 오브젝트 생성
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/join", {
		type: "POST",
		dataType: "json", // 응답할 때 데이터
		data: JSON.stringify(data),
		headers: { // http header에 들고 갈 요청 데이터
			"Content-Type": "application/json" // 나 json으로 날릴거야
		}
	}).done((res) => {
		if (res.code == 1) {
			console.log(res);
			location.href = "/loginForm";
		}
	});
}

function checkUsername() {
	// 0. 통신 오브젝트 생성 (Get 요청은 바디가 없다)

	// 1. 사용자가 적은 username 값을 가져오기
	let username = $("#username").val();

	// 2. Ajax 통신, same origin (크로스오리진 안붙여도 됨)
	$.ajax(`/users/usernameSameCheck?username=${username}`, {
		type: "GET",
		dataType: "json",
		async: true
	}).done((res) => {
		if (res.code == 1) { // 통신 성공
			//alert("통신성공");
			if (res.data == false) {
				alert("아이디가 중복되지 않았습니다");
				isUsernameSameCheck = true;
			} else {
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요.");
				isUsernameSameCheck = false;
				$("#username").val("");
			}
		}
	});
}

function login() {
	//0. 통신 오브젝트 생성하기(JS 오브젝트)
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		remember: $("#remember").prop("checked")
	};

	$.ajax("/login", {
		type: "POST",
		dataType: "json",      //응답 데이터(json으로 받고 싶어!)
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/";
		} else {
			alert("로그인 실패");
		}
	});
}

function resign() {
	let id = $("#id").val();

	$.ajax("/users/" + id, {
		type: "DELETE",
		dataType: "json" // 응답할 때 데이터
	}).done((res) => {
		if (res.code == 1) {
			alert("회원 탈퇴 완료");
			location.href = "/";
		} else {
			alert("회원탈퇴 실패하였습니다");
		}
	});
}

function update() {
	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};
	let id = $("#id").val();

	$.ajax("/users/" + id, {
		type: "PUT",
		dataType: "json", // 응답할 때 데이터
		data: JSON.stringify(data),
		headers: { // http header에 들고 갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {
		if (res.code == 1) {
			alert("회원 수정 완료");
			location.reload(); // f5 랑 같은 거
		} else {
			alert("업데이트 실패하였습니다");
		}
	});
}