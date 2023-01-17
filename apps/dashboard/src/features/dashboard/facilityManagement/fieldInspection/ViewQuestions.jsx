export function ViewQuestions({questions}) {
	return (
		<div>
			{
				questions.length > 0 
					? questions.map((question, index) => (
						<QuestionItem key={question.id} index={index} question={question} />
					))
					: <span className="block mt-4">No data</span>
			}
		</div>
	)
}

function QuestionItem({question, index}) {
	return (
		<div 
			className="flex items-center gap-4 py-4 border-solid border-x-0 border-t-0 border-b border-[#f4f4f4]"
		>
			<div>
				<span 
					className="bg-[#E8EAF6] rounded-full h-[24px] w-[24px] text-[#005AA6] flex items-center justify-center font-bold"
				>
					{index+1}
				</span>
			</div>
			<div className="flex-1">
				<h1 className="text-[16px] mb-1">{question.question}</h1>
				<span className="text-[#7A7A7A]">{question.answer}</span>
			</div>
		</div>
	)
}