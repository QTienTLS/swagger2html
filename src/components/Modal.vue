<template>
  <Teleport to="body">
    <!-- <Transition name="modal"> -->
    <div class="modal" v-if="openModal1">
      <div class="modal__overlay"></div>
      <Transition name="modal__body">
        <div class="modal__body" v-if="openModal" :class="`modal__body--${size}`">
        <div class="modal__body__header">
          <div class="modal__body__header__title">
            <h3>{{ title }}</h3>
          </div>
          <div class="modal__body__header__close">
            <Icon
              icon="material-symbols-light:close"
              width="20"
              height="20"
              @click="close"
            />
          </div>
        </div>
        <div class="modal__body__content">
          <slot></slot>
        </div>
        <div class="modal__body__footer">
          <div class="btn btn-primary" @click="close">Đóng</div>
        </div>
      </div>
    </Transition>
  </div>
<!-- </Transition> -->
  </Teleport>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      openModal: false,
      openModal1: false,
    };
  },
  methods: {
    close() {
      this.openModal = false;
      this.$emit('close');
      setTimeout(() => {
        this.openModal1 = false;
      }, 300);
    },
    open() {
      this.openModal = true;
      this.openModal1 = true;
      this.$emit('open');
    },
  },
};
</script>

<style lang="scss" scoped>

.modal__body-enter-active, .modal__body-leave-active {
  transition: all 0.3s ease-in-out;
}

.modal__body-enter, .modal__body-leave-to {
  opacity: 0;
  transform: scale(0.1);
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease-out;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // transition: all 0.3s ease-out;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }


  &__body {
    position: relative;
    z-index: 2;
    width: 60rem;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 90vh;
    overflow-y: auto;
    animation: openBody 0.3s ease-out;
    &--sm {
      max-width: 30rem;
    }
    &--md {
      max-width: 60rem;
    }
    &--lg {
      max-width: 90rem;
    }
    &--xl {
      max-width: 120rem;
    }
    &--max {
      max-width: 90vw;
      width: 90vw;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;

      &__title {
        h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 500;
        }
      }

      &__close {
        cursor: pointer;
      }
    }

    &__content {
      padding: 20px;
      flex: 1;
      overflow: auto;
    }

    &__footer {
      padding: 10px 20px;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

@keyframes openBody {
  from {
    opacity: 0;
    transform: scale(0.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes closeBody {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
