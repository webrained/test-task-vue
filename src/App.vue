<template>
  <div id="app">
    <el-button type="success" @click="openDialog('addClient')"
      >New Client</el-button
    >

    <el-table :data="clients" border>
      <el-table-column label="Name" prop="name"> </el-table-column>
      <el-table-column label="Email" prop="email"> </el-table-column>
      <el-table-column label="Phone" prop="phone"> </el-table-column>
      <el-table-column label="Providers" prop="providers"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openDialog('editClient', scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteClient(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addClientDialog" width="30%">
      <el-form
        :model="addClientDialogContent"
        :rules="rules"
        ref="addClientDialogContent"
        label-width="75px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="addClientDialogContent.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="addClientDialogContent.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="addClientDialogContent.phone"></el-input>
        </el-form-item>
        <el-form-item label="Providers">
          <el-row>
            <el-col :span="16">
              <el-input v-model="newProvider"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                style="margin-bottom: 20px"
                @click="addProvider(newProvider)"
                >Add Provider</el-button
              >
            </el-col>
          </el-row>
          <el-checkbox-group v-model="addClientDialogContent.providers">
            <el-row v-for="(provider, index) in providers" :key="index">
              <el-checkbox :label="provider._id">{{
                provider.name
              }}</el-checkbox>
              <el-button
                type="danger"
                class="action-btn"
                icon="el-icon-delete"
                circle
                @click="deleteProvider(provider._id, index)"
              ></el-button>
              <el-button
                type="primary"
                class="action-btn"
                icon="el-icon-edit"
                circle
                @click="openProviderDialog(provider._id, provider.name, index)"
              ></el-button>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item align="right">
          <el-button @click="addClientDialog = false">Cancel</el-button>
          <el-button type="primary" @click="addClient('addClientDialogContent')"
            >Add Client</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editProviderDialog" width="30%">
      <el-form
        :model="editProviderDialogContent"
        :rules="providerRules"
        ref="editProviderDialogContent"
        label-width="75px"
      >
        <el-form-item label="Provider" prop="name">
          <el-input v-model="editProviderDialogContent.name"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button @click="editProviderDialog = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="editProvider('editProviderDialogContent')"
            >Update</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editClientDialog" width="30%">
      <el-form
        :model="editClientDialogContent"
        :rules="rules"
        ref="editClientDialogContent"
        label-width="75px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="editClientDialogContent.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editClientDialogContent.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="editClientDialogContent.phone"></el-input>
        </el-form-item>
        <el-form-item label="Providers">
          <el-row>
            <el-col :span="16">
              <el-input v-model="newProvider"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                style="margin-bottom: 20px"
                @click="addProvider(newProvider)"
                >Add Provider</el-button
              >
            </el-col>
          </el-row>
          <el-checkbox-group v-model="editClientDialogContent.providers">
            <el-row v-for="(provider, index) in providers" :key="index">
              <el-checkbox :label="provider._id">{{
                provider.name
              }}</el-checkbox>
              <el-button
                type="danger"
                class="action-btn"
                icon="el-icon-delete"
                circle
                @click="deleteProvider(provider._id, index)"
              ></el-button>
              <el-button
                type="primary"
                class="action-btn"
                icon="el-icon-edit"
                circle
                @click="openProviderDialog(provider._id, provider.name, index)"
              ></el-button>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item align="right">
          <el-button
            type="danger"
            @click="
              deleteClient(
                editClientDialogContent.index,
                editClientDialogContent
              )
            "
            >Delete</el-button
          >
          <el-button @click="editClientDialog = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="editClient('editClientDialogContent')"
          >
            Update Client
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editProviderDialog" width="30%">
      <el-form
        :model="editProviderDialogContent"
        :rules="providerRules"
        ref="editProviderDialogContent"
        label-width="75px"
      >
        <el-form-item label="Provider" prop="name">
          <el-input v-model="editProviderDialogContent.name"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button @click="editProviderDialog = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="submitProviderForm('editProviderDialogContent')"
            >Update</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Settings',
  data() {
    return {
      newProvider: '',
      clients: [],
      providers: [],
      addClientDialog: false,
      editClientDialog: false,
      editProviderDialog: false,
      addClientDialogContent: {
        name: '',
        email: '',
        phone: '',
        providers: []
      },
      editClientDialogContent: {},
      editProviderDialogContent: {
        id: '',
        name: '',
        index: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input client name',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Please input client email',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change']
          }
        ]
      },
      providerRules: {
        name: [
          {
            required: true,
            message: 'Please input provider name',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addClient(formName) {
      let that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .addClient(this.addClientDialogContent)
            .then(function() {
              that.addClientDialog = false
              location.reload()
            })
            .catch(function(err) {
              alert(err)
            })
        } else {
          return false
        }
      })
    },
    editClient(formName) {
      let that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .editClient(this.editClientDialogContent)
            .then(function() {
              that.editClientDialog = false
              location.reload()
            })
            .catch(function(err) {
              alert(err)
            })
        } else {
          return false
        }
      })
    },
    editProvider(formName) {
      let that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .editProvider(this.editProviderDialogContent)
            .then(function(res) {
              that.providers[that.editProviderDialogContent.index] = res
              that.editProviderDialog = false
              that.editProviderDialogContent.provider = ''
            })
            .catch(function(err) {
              alert(err)
            })
        } else {
          return false
        }
      })
    },
    addProvider(name) {
      let that = this
      api
        .addProvider({ name: name })
        .then(function(res) {
          that.providers.push(res)
          that.newProvider = ''
        })
        .catch(function(err) {
          alert(err)
        })
    },
    openProviderDialog(id, name, index) {
      this.editProviderDialog = true
      this.editProviderDialogContent.id = id
      this.editProviderDialogContent.name = name
      this.editProviderDialogContent.index = index
    },
    deleteProvider(id, index) {
      let that = this
      api.deleteProvider(id).then(function() {
        that.providers.splice(index, 1)
      })
    },
    async getClients() {
      this.clients = await api.getClients()
    },
    async getProviders() {
      this.providers = await api.getProviders()
    },
    deleteClient(index, row) {
      let that = this
      api
        .deleteClient(row._id)
        .then(function() {
          that.editClientDialog = false
          that.clients.splice(index, 1)
        })
        .catch(function(err) {
          alert(err)
        })
    },
    openDialog(type, index, row) {
      if (type == 'addClient') {
        this.addClientDialog = true
      }
      if (type == 'editClient') {
        let that = this
        api
          .getClient(row._id)
          .then(function(res) {
            that.editClientDialog = true
            that.editClientDialogContent = res
            that.editClientDialogContent.index = index
          })
          .catch(function(err) {
            alert(err)
          })
      }
    }
  },
  async created() {
    this.getProviders()
    this.getClients()
  }
}
</script>

<style lang="scss">
body {
  font-family: Ubuntu;
  .action-btn {
    float: right;
    &:nth-of-type(2) {
      margin-right: 10px;
    }
  }
  .el-table__empty-text {
    display: none;
  }
}
</style>
