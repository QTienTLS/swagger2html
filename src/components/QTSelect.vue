<template>
  <div class="custom-select" :tabindex="tabindex" :class="{'custom-select--open': open}" @blur="open=false">
    <div v-if="!multiple" class="custom-select--single">
      <div class="custom-select--single__selected" @click="open = !open">
        <div class="custom-select--single__selected__value">
          <span>{{ value }}</span>
        </div>
      </div>
      <div 
      :class="{selectHide: !open}"
      class="custom-select--single__options">
        <div class="custom-select--single__options__option"
        @click="selectSingle(option)"
        v-for="option in options" :key="option.id">
          <span>{{ option.text }}</span>
        </div>
      </div>
    </div>
    <div v-else class="custom-select--multiple"></div>
    <div class="custom-select__arrow"
    :class="{'custom-select__arrow--open': open}"
    >
      <Icon icon="iconamoon:arrow-up-2" width="20" height="20" />
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      options: {
        type: Array,
        default: () => []
      },
      value: {
        type: [String, Number, Array],
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      tabindex: {
        type: Number,
        default: 0,
        required: false
      }
    },
    data() {
      return {
        open: false,
        value: ''
      }
    },
    methods: {
      selectSingle(option){
        this.$emit('input', option.value);
        this.open = false;
        this.value = option.text;
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '../sass/variables.scss';
.selectHide{
  display: none;
}
.custom-select{
  cursor: pointer;
  position: relative;
  width: 100%;
  min-height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  &--open{
    border-color: $color-primary;
    border-radius: 4px 4px 0 0;
  }
  //arrow
  &__arrow{
    width: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
      transform: rotate(90deg);
      transition: transform 0.3s;
    }
    &--open{
      svg{
        transform: rotate(180deg);
      }
    }
  }


  //single

  &--single{

    &__options{
      position: absolute;
      top: calc(100% + 1px);
      left: -1px;
      width: calc(100% + 2px);
      max-height: 200px;
      overflow-y: auto;
      background-color: #fff;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 4px 4px;
      // box-shadow: 0 0 5px #ccc;
      &__option{
        padding: 0.5rem 1rem;
        cursor: pointer;
        &:hover{
          background-color: #ccc;
        }
      }
    
    }

    width: calc(100% - 2.5rem);
    &__selected{
      width: 100%;
      height: 100%;
    }
  }
}




</style>