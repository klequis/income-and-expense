import { fetchJson } from './api-helpers'
import { isEmpty } from 'validator'

// eslint-disable-next-line
import { orange, green, redf } from 'logger'

/*
    [description] && [true || false]

    '' && true

    someVale && true

    '' && false

    someVale && false
*/

// Errors are handled by fetchJson()
export default {
  criteria: {
    async read(criteria) {
      // orange('criteria.read: criteria', criteria)
      try {
        const url = `/api/criteria/criteria-test/`
        const data = await fetchJson(url, {
          method: 'POST',
          body: JSON.stringify(criteria)
        })
        return data
      } catch (e) {
        redf('api.criteria.read ERROR', e.message)
        console.log(e)
      }
    }
  },
  rules: {
    async read() {
      try {
        const url = `/api/rules`
        const data = await fetchJson(url, {
          method: 'GET'
        })
        orange('api.rules.read: data.length', data.length)
        return data
      } catch (e) {
        redf('api.rules.read ERROR', e.message)
        console.log(e)
      }
    },
    async rulesReadById(ruleId) {
      const url = `api/rules/${ruleId}`
      const data = await fetchJson(url, {
        method: 'GET'
      })
      return data
    },
    async create(rule) {
      // orange('api.rules.create: rule', rule)
      const url = `api/rules/new-rule`
      const data = await fetchJson(url, {
        method: 'POST',
        body: JSON.stringify(rule)
      })
      // orange('rules.create: data', data)
      return data
    },
    async delete(ruleId) {
      const url = `api/rules/ruleid/${ruleId}`
      const data = await fetchJson(url, {
        method: 'DELETE'
      })
      // orange('rules.delete: data.length', data.length)
      return data
    },
    async update(_id, rule) {
      const url = `api/rules/ruleid/${_id}`
      const data = await fetchJson(url, {
        method: 'PATCH',
        body: JSON.stringify(rule)
      })
      // orange('api.rules.update: data.length', data.length)
      return data
    }
  },
  views: {
    async read(viewUrlPart) {
      orange('api.views.read: viewUrlPart', viewUrlPart)
      try {
        const url = `/api/views/${viewUrlPart}`
        const data = await fetchJson(url, {
          method: 'GET'
        })
        orange('api.views.read: data.length', data.length)
        return data
      } catch (e) {
        redf('api.data.views ERROR', e.message)
        console.log(e)
      }
    }
  },
  data: {
    async read(description, showOmitted, view) {
      // /description/:description/showOmitted/:showOmitted
      const descriptionPart = isEmpty(description)
        ? ''
        : `/description/${description}`
      const showOmittedPart = `/showOmitted/${showOmitted}`
      const viewPart = isEmpty(view) ? '' : `/view/${view}`
      const url = `/api/data${descriptionPart}${showOmittedPart}${viewPart}`
      const data = await fetchJson(url, {
        method: 'GET'
      })
      return data
    },
    async readByCriteria(criteria) {
      try {
        const url = `/api/data/criteria/`
        const data = await fetchJson(url, {
          method: 'POST',
          body: JSON.stringify(criteria)
        })
        return data
      } catch (e) {
        redf('api.data.readByCriteria ERROR', e.message)
        console.log(e)
      }
    },
    async importData() {
      const data = await fetchJson(`api/import`, {
        method: 'GET'
      })
      orange('importData: data', data)
      return data
    }
  }
}
