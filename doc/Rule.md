Functions
- getRule

Props
- location,
- ruleId,
- removeRuleId,
- updateRuleAndView

Actions
- criteriaTestClear,
- criteriaTestReadRequest,
- rowIdShowClear,
- ruleCreateRequest,
- ruleDeleteRequest,
- ruleTmpAdd,
- ruleTmpRemove,
- ruleTmpUpdate,
- ruleUpdateRequest

State
- _rule
- _viewMode
- _dirty

Local Vars
- _criteriaTestResults
- _classes
- _pathname
- _currentViewName

Methods

- _actionChange
- _actionAdd
- _actionRemove
- _cancelClick
- _criterionChange
- _criterionAdd
- _criterionRemove
- _deleteClick
- _dirtyChange
- _editClick
- _saveClick
- _criteriaTestClick


Renders
- <ActionButton buttonType={buttonTypes.edit} />
- <ActionButton buttonType={buttonTypes.save} />
- <ActionButton buttonType={buttonTypes.cancel}/ >
- <ActionButton buttonType={buttonTypes.delete}/ >
- <ActionButton buttonType={buttonTypes.add} />
- <CriterionView />
- <CriterionEdit />
- <ActionView />
- <ActionEdit />
- <CriteriaTestResults>