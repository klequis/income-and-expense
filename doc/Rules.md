# Rules

#### Functions

#### Props
- docId,
- ruleIds = []
- updateRulesAndView

#### Actions
  - ruleTmpAdd (should start with _ )

#### State
  - _ruleIds

#### Local Vars
  - rowShowId = state.ui.rowIdShow

#### Methods
  - _addClick (add a new tmp rule)
  - _removeRuleId

#### Renders

```js
- <ActionButton>Add Rule</ActionButton>
- <Rule /> (.map)

<tr>
  <td>
    - <ActionButton>
    - <Rule>
  </td>
</tr>
```
