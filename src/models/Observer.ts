type ObserverFunction<T> = (data: T) => void;

class Observable<T> {
  private observers: ObserverFunction<T>[] = [];

  // Observer 등록
  subscribe(observer: ObserverFunction<T>): void {
    this.observers.push(observer);
  }

  // Observer 해제
  unsubscribe(observer: ObserverFunction<T>): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // Observer들에게 알림
  notify(data: T): void {
    this.observers.forEach(observer => observer(data));
  }
}

export default Observable;