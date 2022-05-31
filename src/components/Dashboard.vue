<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Exemplo de gráfico</h5>
        <Chart type="line" :data="basicData" :options="basicOptions" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicData: {
        labels: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho'
        ],
        datasets: [
          {
            label: 'Primeiro Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4
          },
          {
            label: 'Segundo Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726',
            tension: 0.4
          }
        ]
      },
      basicOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      }
    }
  }
}
</script>
