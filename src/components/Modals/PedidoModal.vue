<template>
  <TabView scrollable :active-index="activeTab" ref="tabview1">
    <TabPanel :disabled="disable_0" header="1º passo">
      <div class="col-12">
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="processo_sei">Processo SEI</label>
            <InputText
              id="processo_sei"
              type="text"
              v-model="pedido.processo_sei"
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.processo_sei }" />
          </div>
          <div class="field col-12">
            <label for="num_ceua">N°CEUA</label>
            <InputText
              id="num_ceua"
              type="text"
              v-model="pedido.num_ceua"
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.num_ceua }" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="vigencia_ceua">Vigência CEUA</label>
            <Calendar
              id="vigencia_ceua"
              v-model="pedido.vigencia_ceua"
              dateFormat="yy-mm-dd"
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.vigencia_ceua }" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="data_solicitacao">Data da solicitação</label>
            <Calendar
              id="data_solicitacao"
              v-model="pedido.data_solicitacao"
              dateFormat="yy-mm-dd"
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.data_solicitacao }" />
          </div>
          <div class="flex justify-content-end col-12">
            <div class="col-6">
              <Button
                label="Próximo"
                @click="disabled ? setPageDisabled(1) : nextPage(1)" />
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
    <TabPanel :disabled="disable_1" header="2º passo">
      <div class="col-12">
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="pesquisador">Pesquisador</label>
            <Dropdown
              id="pesquisador"
              v-model="pedido.pesquisador"
              :options="pesquisadores"
              optionLabel="nome"
              :filter="true"
              placeholder="Selecione um Pesquisador"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível"
              :class="{ 'p-invalid': required && !pedido.pesquisador }">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12">
            <label for="previsao">Previsão</label>
            <Dropdown
              id="previsao"
              v-model="pedido.previsao"
              :options="previsoes"
              optionLabel="nome_previsao"
              :filter="true"
              placeholder="Selecione uma Previsão"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível"
              :class="{ 'p-invalid': required && !pedido.previsao }">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12">
            <label for="projeto">Projeto</label>
            <Dropdown
              id="projeto"
              v-model="pedido.projeto"
              :options="projetos"
              optionLabel="nome_projeto"
              :filter="true"
              placeholder="Selecione um projeto"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível"
              :class="{ 'p-invalid': required && !pedido.projeto }">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome_projeto }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome_projeto }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12">
            <label for="linha_pesquisa">Linha de Pesquisa</label>
            <Dropdown
              id="linha_pesquisa"
              v-model="pedido.linha_pesquisa"
              :options="pesquisas"
              optionLabel="nome_linha_pesquisa"
              :filter="true"
              placeholder="Selecione uma Linha de Pesquisa"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome_linha_pesquisa }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome_linha_pesquisa }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12">
            <label for="nivel_projeto">Nível de projeto</label>
            <Dropdown
              id="nivel_projeto"
              v-model="pedido.nivel_projeto"
              :options="niveis"
              optionLabel="nome_nivel_projeto"
              :filter="true"
              placeholder="Selecione um Nível de projeto"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome_nivel_projeto }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome_nivel_projeto }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12">
            <label for="laboratotio">Laboratório</label>
            <Dropdown
              id="laboratotio"
              v-model="pedido.laboratotio"
              :options="laboratorios"
              optionLabel="nome_laboratorio"
              :filter="true"
              placeholder="Selecione um Laboratório"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome_laboratorio }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome_laboratorio }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12">
            <label for="fialidade">Finalidade</label>
            <Dropdown
              id="fialidade"
              v-model="pedido.finalidade"
              :options="finalidades"
              optionLabel="nome_finalidade"
              :filter="true"
              placeholder="Selecione uma Finalidade"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível"
              :class="{ 'p-invalid': required && !pedido.finalidade }">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome_finalidade }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome_finalidade }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="flex col-12 gap-4">
            <Button
              label="Anterior"
              @click="disabled ? setPageDisabled(0) : prevPage(0)">
            </Button>
            <Button
              label="Próximo"
              @click="disabled ? setPageDisabled(2) : nextPage(2)">
            </Button>
          </div>
        </div>
      </div>
    </TabPanel>
    <TabPanel :disabled="disable_2" header="3º passo">
      <div class="col-12">
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-6">
            <label for="num_aprovado">Nº Aprovado</label>
            <InputNumber
              id="num_aprovado"
              mode="decimal"
              :useGrouping="false"
              v-model="pedido.num_aprovado"
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.num_aprovado }" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="num_solicitado">Nº Solicitado</label>
            <InputNumber
              id="num_solicitado"
              mode="decimal"
              :useGrouping="false"
              v-model="pedido.num_solicitado"
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.num_solicitado }" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="adendo_1">Adendo 1</label>
            <InputNumber
              id="adendo_1"
              mode="decimal"
              :useGrouping="false"
              v-model="pedido.adendo_1"
              :disabled="disabled" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="adendo_2">Adendo 2</label>
            <InputNumber
              id="adendo_2"
              mode="decimal"
              :useGrouping="false"
              v-model="pedido.adendo_2"
              :disabled="disabled" />
          </div>
          <div class="field col-12">
            <label class="mb-3">Sexo</label>
            <div class="formgrid grid">
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="femea"
                  name="sexo"
                  value="femea"
                  v-model="pedido.sexo"
                  :disabled="disabled"
                  :class="{ 'p-invalid': required && !pedido.sexo }" />
                <label for="femea">Fêmea</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="macho"
                  name="sexo"
                  value="macho"
                  v-model="pedido.sexo"
                  :disabled="disabled"
                  :class="{ 'p-invalid': required && !pedido.sexo }" />
                <label for="macho">Macho</label>
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-6">
            <label for="idade">Idade</label>
            <InputText id="idade" v-model="pedido.idade" :disabled="disabled" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="peso">Peso</label>
            <InputText id="peso" v-model="pedido.peso" :disabled="disabled" />
          </div>
          <div class="field col-12">
            <label for="especie">Espécie</label>
            <Dropdown
              id="especie"
              v-model="pedido.especie"
              :options="especies"
              optionLabel="nome_especie"
              :filter="true"
              placeholder="Selecione uma Espécie"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível"
              :class="{ 'p-invalid': required && !pedido.especie }">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome_especie }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome_especie }}</div>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12">
            <label for="linhagem">Linhagem</label>
            <Dropdown
              id="linhagem"
              v-model="pedido.linhagem"
              :options="linhagens"
              optionLabel="nome_linhagem"
              :filter="true"
              placeholder="Selecione uma Linhagem"
              :disabled="disabled"
              emptyFilterMessage="Nenhuma opção corresponde a busca"
              emptyMessage="Nenhuma opção disponível"
              :class="{ 'p-invalid': required && !pedido.linhagem }">
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <div>{{ slotProps.value.nome_linhagem }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.nome_linhagem }}</div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="flex col-12 gap-4">
        <Button
          label="Anterior"
          @click="disabled ? setPageDisabled(1) : prevPage(1)" />
        <Button
          label="Próximo"
          @click="disabled ? setPageDisabled(3) : nextPage(3)" />
      </div>
    </TabPanel>
    <TabPanel :disabled="disable_3" header="4º passo">
      <div class="col-12">
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="titulo">Título</label>
            <Textarea
              id="titulo"
              type="text"
              v-model="pedido.titulo"
              :autoResize="true"
              rows="3"
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.titulo }" />
          </div>
          <div class="field col-12">
            <label for="especificar">Especificar</label>
            <Textarea
              id="especificar"
              type="text"
              v-model="pedido.especificar"
              :autoResize="true"
              rows="3"
              :disabled="disabled" />
          </div>
          <div class="field col-12">
            <label for="observacoes">Observações</label>
            <Textarea
              id="observacoes"
              type="text"
              v-model="pedido.observacoes"
              :autoResize="true"
              rows="3"
              :disabled="disabled" />
          </div>
          <div class="field col-12">
            <label for="exper">Laboratório de Experimentação</label>
            <InputText
              id="exper"
              type="text"
              v-model="pedido.exper"
              v-tooltip.top.focus="
                'Laboraório em que os animais estão alocados'
              "
              :disabled="disabled"
              :class="{ 'p-invalid': required && !pedido.exper }" />
          </div>
        </div>
      </div>
      <div class="flex col-12 gap-4">
        <Button
          label="Anterior"
          @click="disabled ? setPageDisabled(2) : prevPage(2)" />
        <Button
          v-if="!disabled"
          label="Salvar"
          class="p-button-success"
          @click="save" />
      </div>
    </TabPanel>
  </TabView>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      disable_0: false,
      disable_1: true,
      disable_2: true,
      disable_3: true,
      pesquisadores: null,
      previsoes: null,
      instituicoes: null,
      projetos: null,
      pesquisas: null,
      niveis: null,
      laboratorios: null,
      finalidades: null,
      especies: null,
      linhagens: null,
      required: false
    }
  },
  props: {
    pedido: Object,
    disabled: Boolean,
    newData: Boolean
  },
  mounted() {
    this.freeTab()
    //TODO: Recuperar as seguintes entidades para que essas possam ser selecionadas
    //cadastrar/editar um pedido
    //pesquisadores
    // previsoes
    // instituicoes
    // projetos
    // pesquisas
    // niveis
    // laboratorios
    // finalidades
    // especies
    // linhagens
  },
  methods: {
    save() {
      this.required = true
      if (this.pedido.titulo && this.pedido.exper) {
        if (this.newData) {
          //TODO: Salvar quando é um novo registro
        } else {
          // TODO: Salvar o que foi editado
        }
      }
    },
    freeTab() {
      if (this.disabled) {
        this.disable_0 = false
        this.disable_1 = false
        this.disable_2 = false
        this.disable_3 = false
      }
    },
    nextPage(tab) {
      if (tab === 1) {
        if (
          this.pedido.processo_sei &&
          this.pedido.data_solicitacao &&
          this.pedido.num_ceua &&
          this.pedido.vigencia_ceua
        ) {
          this.disable_0 = true
          this.disable_1 = false
          this.activeTab = tab
          this.required = false
        } else {
          this.required = true
        }
      } else if (tab === 2) {
        this.disable_1 = true
        this.disable_2 = false
        this.activeTab = tab
        this.required = true

        // DESCOMENTAR QUANDO A RECUPERAÇÃO DE OPÇOES PARA OS CAMPOS DE DROPDOWN ESTIVER FUNCIONANDO

        // if (
        //   this.pedido.pesquisador &&
        //   this.pedido.previsao &&
        //   this.pedido.projeto &&
        //   this.pedido.finalidade
        // ) {
        // this.disable_1 = true
        // this.disable_2 = false
        // this.activeTab = tab
        //   this.required = false
        // } else {
        //   this.required = true
        // }
      } else {
        if (
          this.pedido.num_aprovado &&
          this.pedido.num_solicitado &&
          this.pedido.sexo
          // && this.pedido.especie &&
          // this.pedido.linhagem
        ) {
          this.disable_2 = true
          this.disable_3 = false
          this.activeTab = tab
          this.required = false
        } else {
          this.required = true
        }
      }
    },
    prevPage(tab) {
      if (tab === 0) {
        this.disable_0 = false
        this.disable_1 = true
        this.activeTab = tab
      } else if (tab === 1) {
        this.disable_1 = false
        this.disable_2 = true
        this.activeTab = tab
      } else {
        this.disable_2 = false
        this.disable_3 = true
        this.activeTab = tab
      }
    },
    setPageDisabled(tab) {
      this.activeTab = tab
    }
  }
}
</script>
