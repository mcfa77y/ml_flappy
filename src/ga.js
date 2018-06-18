
class GA {
  calculateFitness(birds) {
    const sum = birds.reduce((totalScore, bird) => {
      totalScore += bird.score;
      return totalScore;
    }, 0);
    // normalize bird scores (linear)
    birds.forEach(bird => bird.fitness = bird.score / sum);
  }

  pickOne(birds) {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r -= birds[index].fitness;
      index += 1;
    }

    index -= 1;

    const mutation_rate = 0.1;
    const bird = birds[index];
    return new Bird(bird.brain.mutate(mutation_rate));
  }
  nextGeneration(birds, total) {
    const new_gen = [];
    this.calculateFitness(birds);
    for (let i = 0; i < total; i++) {
      new_gen.push(this.pickOne(birds));
    }
    return new_gen;
  }
}
