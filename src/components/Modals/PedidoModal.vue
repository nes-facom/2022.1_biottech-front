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
              :disabled="disabled" />
          </div>
          <div class="field col-12">
            <label for="num_ceua">N°CEUA</label>
            <InputText
              id="num_ceua"
              type="text"
              v-model="pedido.num_ceua"
              :disabled="disabled" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="vigencia_ceua">Vigência CEUA</label>
            <Calendar
              id="vigencia_ceua"
              v-model="pedido.vigencia_ceua"
              dateFormat="yy-mm-dd"
              :disabled="disabled" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="data_solicitacao">Data da solicitação</label>
            <Calendar
              id="data_solicitacao"
              v-model="pedido.data_solicitacao"
              dateFormat="yy-mm-dd"
              :disabled="disabled" />
          </div>
          <div class="field col-12">
            <label for="saldo_ceua">Saldo CEUA</label>
            <InputText
              id="saldo_ceua"
              type="text"
              v-model="pedido.saldoCEUA"
              :disabled="disabled" />
          </div>
          <div class="flex justify-content-end col-12">
            <div class="col-6">
              <Button
                label="Próximo"
                @click="
                  () => (
                    (disable_1 = false), (disable_0 = true), (activeTab = 1)
                  )
                ">
              </Button>
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
              :disabled="disabled">
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
              :disabled="disabled">
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
              :disabled="disabled">
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
              :disabled="disabled">
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
              :disabled="disabled">
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
              :disabled="disabled">
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
              :disabled="disabled">
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
        </div>
        <div class="flex field col-12 gap-4">
          <Button
            label="Anterior"
            @click="
              () => ((disable_0 = false), (disable_1 = true), (activeTab = 0))
            ">
          </Button>
          <Button
            label="Próximo"
            @click="
              () => ((disable_1 = true), (disable_2 = false), (activeTab = 2))
            ">
          </Button>
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
              :disabled="disabled" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="num_solicitado">Nº Solicitado</label>
            <InputNumber
              id="num_solicitado"
              mode="decimal"
              :useGrouping="false"
              v-model="pedido.num_solicitado"
              :disabled="disabled" />
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
                  :disabled="disabled" />
                <label for="femea">Fêmea</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="macho"
                  name="sexo"
                  value="macho"
                  v-model="pedido.sexo"
                  :disabled="disabled" />
                <label for="macho">Macho</label>
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-6">
            <label for="adendo_1">Idade</label>
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
              :disabled="disabled">
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
              :disabled="disabled">
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
      <div class="flex field col-12 gap-4">
        <Button
          label="Anterior"
          @click="
            () => ((disable_1 = false), (disable_2 = true), (activeTab = 1))
          "></Button>
        <Button
          label="Próximo"
          @click="
            () => ((disable_2 = true), (disable_3 = false), (activeTab = 3))
          "></Button>
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
              :disabled="disabled" />
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
            <label for="exper">Exper</label>
            <InputText
              id="exper"
              type="text"
              v-model="pedido.exper"
              :disabled="disabled" />
          </div>
        </div>
      </div>
      <div class="flex field col-12 gap-4">
        <Button
          label="Anterior"
          @click="
            () => ((disable_2 = false), (disable_3 = true), (activeTab = 2))
          "></Button>
        <Button
          v-if="!disabled"
          label="Salvar"
          class="p-button-success"
          @click="salvar"></Button>
      </div>
      <div class="flex col-6"></div>
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
      linhagens: null
    }
  },
  props: {
    pedido: Object,
    disabled: Boolean
  },
  mounted() {
    this.freeTab()
  },
  methods: {
    salvar() {
      //TODO: SALVAR O PEDIDO
    },
    freeTab() {
      if (this.disabled) {
        this.disable_0 = false
        this.disable_1 = false
        this.disable_2 = false
        this.disable_3 = false
      }
    }
  }
}
</script>
