<?php
	include_once("Controller.php");

	class MathController extends Controller {
		public function question($req) {
			$operators = array('+', '-', '*', '%');

			$operand1 = rand(1, 99);
			$operand2 = rand(1, 99);
			$operator = $operators[rand(0, 3)];
			$istrue = rand(0, 1);

			$result = eval("return " 
				. $operand1 . " "
				. $operator . " "
				. $operand2 . ";");

			if ($istrue == 0)
				$result += rand(1, 99);

			$question = $operand1 . " "
				. $operator . " "
				. $operand2 . " = "
				. $result;

			$_SESSION["question"] = $question;
			$_SESSION["answer"] = ($istrue == 1);
			
			echo $question;
		}

		public function answer($req) {
			$answerStr = $req->route->identifier;

			$success = 
				stristr($answerStr, 'true') !== FALSE
					? $_SESSION["answer"]
					: (stristr($answerStr, 'false') !== FALSE
						? !$_SESSION["answer"]
						: false);

			$_SESSION['canPostComment'] = $success;
			
			echo $success ? "succeeded" : "failed";
		}
	}
?>