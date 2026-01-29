
import React, { useState } from 'react';
import { QUESTIONS, ILAC_LOGO, COLORS } from './constants';
import { QuestionType, Answer, EvaluationResult, UserData } from './types';
import AudioRecorder from './components/AudioRecorder';
import { evaluateTest, sendFinalData } from './services/geminiService';

type View = 'START' | 'QUIZ' | 'LOADING' | 'RESULT' | 'OFFER' | 'FORM' | 'SUCCESS' | 'GOODBYE';

const App: React.FC = () => {
  const [view, setView] = useState<View>('START');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentVal, setCurrentVal] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [user, setUser] = useState<UserData>({ firstName: '', lastName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleNext = async () => {
    const newAnswers = [...answers, { questionId: currentQ.id, answer: currentVal }];
    setAnswers(newAnswers);
    setCurrentVal('');

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setView('LOADING');
      const res = await evaluateTest(QUESTIONS, newAnswers);
      setEvaluation(res);
      setView('RESULT');
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await sendFinalData(user, evaluation!);
    setLoading(false);
    setView('SUCCESS');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header de Marca */}
        <div className="bg-aurora p-8 text-white text-center">
          <div className="flex justify-center mb-4 bg-white/20 p-2 rounded-2xl backdrop-blur-md w-fit mx-auto">
            {ILAC_LOGO}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">ILAC ENGLISH TEST</h1>
          <p className="text-sm opacity-80 font-medium">Placement Test - MCER Standards</p>
        </div>

        <div className="p-8 md:p-12">
          {view === 'START' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-brand-navy mb-4">¿Preparado para despegar?</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Este examen consta de 20 preguntas que evalúan gramática, lectura, escritura y habla. 
                Determinaremos tu nivel según el Marco Común Europeo.
              </p>
              <button 
                onClick={() => setView('QUIZ')}
                className="w-full bg-brand-navy text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
              >
                Comenzar ahora
              </button>
            </div>
          )}

          {view === 'QUIZ' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase">Pregunta {currentIndex + 1} de 20</span>
                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-teal transition-all" style={{ width: `${((currentIndex+1)/20)*100}%` }}></div>
                </div>
              </div>

              {currentQ.context && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border-l-4 border-brand-teal italic text-sm text-slate-600">
                  "{currentQ.context}"
                </div>
              )}

              <h3 className="text-xl font-bold text-brand-navy mb-8 leading-snug">{currentQ.text}</h3>

              {currentQ.type === QuestionType.MULTIPLE_CHOICE || currentQ.type === QuestionType.READING ? (
                <div className="space-y-3">
                  {currentQ.options?.map(opt => (
                    <label 
                      key={opt}
                      className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${currentVal === opt ? 'border-brand-teal bg-teal-50' : 'border-slate-100'}`}
                    >
                      <input 
                        type="radio" 
                        name="q" 
                        checked={currentVal === opt} 
                        onChange={() => setCurrentVal(opt)}
                        className="hidden"
                      />
                      <span className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 ${currentVal === opt ? 'border-brand-teal bg-brand-teal' : 'border-slate-300'}`}></span>
                      <span className="font-medium text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : currentQ.type === QuestionType.WRITING ? (
                <textarea 
                  className="w-full p-4 border-2 border-slate-100 rounded-2xl h-32 focus:border-brand-teal outline-none transition-all"
                  placeholder="Escribe tu respuesta aquí..."
                  value={currentVal}
                  onChange={(e) => setCurrentVal(e.target.value)}
                />
              ) : (
                <AudioRecorder onStop={() => setCurrentVal("[Audio grabado]")} />
              )}

              <button 
                disabled={!currentVal}
                onClick={handleNext}
                className="w-full mt-8 bg-brand-navy text-white font-bold py-4 rounded-2xl disabled:opacity-30 transition-all"
              >
                {currentIndex === 19 ? 'Ver resultados' : 'Siguiente'}
              </button>
            </div>
          )}

          {view === 'LOADING' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-teal rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-brand-navy font-bold">Nuestra IA está evaluando tu nivel...</p>
            </div>
          )}

          {view === 'RESULT' && evaluation && (
            <div className="text-center">
              <div className="w-24 h-24 bg-aurora rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-xl">
                {evaluation.level}
              </div>
              <h2 className="text-2xl font-bold text-brand-navy mb-2">¡Examen Finalizado!</h2>
              <p className="text-slate-500 mb-8 font-medium">Tu nivel de acuerdo a las respuestas es: <span className="text-brand-teal">{evaluation.level}</span></p>
              
              <div className="bg-slate-50 p-6 rounded-3xl text-left border border-slate-100 mb-8">
                <p className="text-sm leading-relaxed text-slate-600">"{evaluation.feedback}"</p>
              </div>

              <button 
                onClick={() => setView('OFFER')}
                className="w-full bg-brand-navy text-white font-bold py-4 rounded-2xl"
              >
                Continuar
              </button>
            </div>
          )}

          {view === 'OFFER' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">¿Querés participar de nuestro curso para mejorar tu nivel?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setView('GOODBYE')}
                  className="py-4 border-2 border-slate-200 text-slate-400 font-bold rounded-2xl hover:bg-slate-50"
                >
                  No
                </button>
                <button 
                  onClick={() => setView('FORM')}
                  className="py-4 bg-brand-teal text-white font-bold rounded-2xl shadow-lg shadow-teal-100"
                >
                  Si
                </button>
              </div>
            </div>
          )}

          {view === 'FORM' && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy mb-6 text-center">Completa tus datos para enviarte la info</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Nombre" className="p-4 bg-slate-50 rounded-xl border-2 border-slate-100 outline-none focus:border-brand-teal" value={user.firstName} onChange={e => setUser({...user, firstName: e.target.value})} />
                <input required placeholder="Apellido" className="p-4 bg-slate-50 rounded-xl border-2 border-slate-100 outline-none focus:border-brand-teal" value={user.lastName} onChange={e => setUser({...user, lastName: e.target.value})} />
              </div>
              <input required type="email" placeholder="Email" className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 outline-none focus:border-brand-teal" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
              <input required type="tel" placeholder="Celular de contacto" className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 outline-none focus:border-brand-teal" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} />
              <button 
                disabled={loading}
                type="submit" 
                className="w-full py-4 bg-brand-navy text-white font-bold rounded-2xl shadow-lg mt-4"
              >
                {loading ? 'Enviando...' : 'Enviar y finalizar'}
              </button>
            </form>
          )}

          {view === 'SUCCESS' && (
            <div className="text-center py-8">
              <div className="text-5xl mb-6">✈️</div>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">¡Excelente, {user.firstName}!</h2>
              <p className="text-slate-600 mb-8">Hemos enviado tus resultados y pronto nos pondremos en contacto contigo.</p>
              <button onClick={() => window.location.reload()} className="text-brand-teal font-bold hover:underline">Volver al inicio</button>
            </div>
          )}

          {view === 'GOODBYE' && (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold text-brand-navy mb-4">Muchas gracias, te esperamos cuando gustes.</h2>
              <button onClick={() => window.location.reload()} className="text-brand-teal font-bold hover:underline mt-4">Cerrar</button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-8 text-xs text-slate-400 font-medium">© {new Date().getFullYear()} Instituto Latinoamericano de Aviación Civil - ILAC</p>
    </div>
  );
};

export default App;
